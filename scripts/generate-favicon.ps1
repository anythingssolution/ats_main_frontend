# Sync favicon assets from web/ (canonical logo pack) into public/.
$root = Split-Path $PSScriptRoot -Parent
$src = Join-Path $root 'web'
$dest = Join-Path $root 'public'

$files = @(
  'favicon.ico',
  'apple-touch-icon.png',
  'icon-192.png',
  'icon-192-maskable.png',
  'icon-512.png',
  'icon-512-maskable.png'
)

foreach ($file in $files) {
  Copy-Item (Join-Path $src $file) (Join-Path $dest $file) -Force
}

# PNG favicon for browsers that prefer type="image/png"
Copy-Item (Join-Path $src 'icon-512.png') (Join-Path $dest 'favicon.png') -Force

Write-Output 'Synced favicon assets from web/ to public/'
