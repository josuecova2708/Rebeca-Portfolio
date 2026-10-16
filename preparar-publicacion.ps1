# Arma la carpeta "publicar" con solo los archivos que necesita el sitio.
# Uso: clic derecho -> "Ejecutar con PowerShell"
#   o: powershell -ExecutionPolicy Bypass -File .\preparar-publicacion.ps1

$ErrorActionPreference = 'Stop'
$raiz = $PSScriptRoot
$destino = Join-Path $raiz 'publicar'

if (Test-Path $destino) {
  Remove-Item -Recurse -Force $destino
}
New-Item -ItemType Directory -Path $destino | Out-Null

# Archivos y carpetas del sitio
$incluir = @('index.html', 'css', 'js', 'recursos')
foreach ($item in $incluir) {
  Copy-Item -Path (Join-Path $raiz $item) -Destination $destino -Recurse
}

# CV en PDF o DOCX, si existe en la raiz (por ejemplo CV-Rebeca-Taboada.pdf)
Get-ChildItem -Path $raiz -File | Where-Object { $_.Extension -in '.pdf', '.docx' } | ForEach-Object {
  Copy-Item -Path $_.FullName -Destination $destino
}

$tamano = (Get-ChildItem -Path $destino -Recurse -File | Measure-Object -Property Length -Sum).Sum / 1MB
Write-Host ''
Write-Host ('Listo: carpeta "publicar" creada ({0:N1} MB).' -f $tamano) -ForegroundColor Green
Write-Host 'Ahora arrastrala a Cloudflare Pages (ver DESPLIEGUE.md).'
Write-Host ''
Read-Host 'Presiona Enter para cerrar'
