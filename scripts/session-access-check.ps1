param(
  [string]$AccessContextPath = (Join-Path $PSScriptRoot '..\.codex\LOCAL_ACCESS_CONTEXT.md')
)

$ErrorActionPreference = 'Stop'

function Get-ContextValue {
  param(
    [Parameter(Mandatory = $true)]
    [string]$Pattern,
    [Parameter(Mandatory = $true)]
    [string]$Content,
    [Parameter(Mandatory = $true)]
    [string]$Label
  )

  $match = [regex]::Match($Content, $Pattern, [System.Text.RegularExpressions.RegexOptions]::Multiline)
  if (-not $match.Success) {
    throw "Nao foi possivel localizar $Label em $AccessContextPath."
  }

  return $match.Groups[1].Value.Trim()
}

$context = Get-Content -LiteralPath $AccessContextPath -Raw
$sharedHost = Get-ContextValue -Pattern 'Host Docker compartilhado:\s*`([^`]+)`' -Content $context -Label 'o host compartilhado'
$portainerPort = Get-ContextValue -Pattern 'Portainer\s*\r?\n-\s*Porta:\s*`([^`]+)`' -Content $context -Label 'a porta do Portainer'
$portainerUser = Get-ContextValue -Pattern 'Portainer\s*\r?\n-\s*Porta:\s*`[^`]+`\s*\r?\n-\s*Usuario:\s*`([^`]+)`' -Content $context -Label 'o usuario do Portainer'
$portainerPassword = Get-ContextValue -Pattern 'Portainer\s*\r?\n-\s*Porta:\s*`[^`]+`\s*\r?\n-\s*Usuario:\s*`[^`]+`\s*\r?\n-\s*Senha:\s*`([^`]+)`' -Content $context -Label 'a senha do Portainer'

[System.Net.ServicePointManager]::ServerCertificateValidationCallback = { $true }

$base = "https://$sharedHost`:$portainerPort"
$loginBody = @{ Username = $portainerUser; Password = $portainerPassword } | ConvertTo-Json -Compress
$token = ((& curl.exe -k -s -X Post "$base/api/auth" -H 'Content-Type: application/json' --data $loginBody) | ConvertFrom-Json).jwt
$endpoints = (& curl.exe -k -s "$base/api/endpoints" -H "Authorization: Bearer $token" | ConvertFrom-Json)
$stacks = (& curl.exe -k -s "$base/api/stacks" -H "Authorization: Bearer $token" | ConvertFrom-Json)
$rhStacks = @($stacks | Where-Object { $_.Name -match '(?i)\brh\b|rh-' })

[pscustomobject]@{
  development = [pscustomobject]@{
    note = 'Validate Docker dev from the shell_command context with `docker version` and `docker compose -f infra/docker-compose.yml ps`.'
  }
  homologation = [pscustomobject]@{
    host = $sharedHost
    portainerPort = $portainerPort
    endpoints = $endpoints.Count
    stacks = $stacks.Count
    rhStackFound = $rhStacks.Count -gt 0
    rhStackNames = @($rhStacks | Select-Object -ExpandProperty Name)
  }
} | ConvertTo-Json -Depth 6
