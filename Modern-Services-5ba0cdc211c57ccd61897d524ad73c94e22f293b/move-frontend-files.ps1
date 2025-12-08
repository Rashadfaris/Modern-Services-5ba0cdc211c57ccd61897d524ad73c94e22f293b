# PowerShell script to move frontend files to frontend/ folder
# Run this from the project root directory

Write-Host "Moving frontend files to frontend/ folder..." -ForegroundColor Green

# Create directories if they don't exist
New-Item -ItemType Directory -Force -Path "frontend/src/components" | Out-Null
New-Item -ItemType Directory -Force -Path "frontend/src/pages" | Out-Null
New-Item -ItemType Directory -Force -Path "frontend/public" | Out-Null

# Move components
if (Test-Path "components") {
    Write-Host "Moving components..." -ForegroundColor Yellow
    Copy-Item -Path "components\*" -Destination "frontend/src/components\" -Recurse -Force
    Write-Host "✓ Components moved" -ForegroundColor Green
} else {
    Write-Host "⚠ Components folder not found" -ForegroundColor Yellow
}

# Move pages
if (Test-Path "pages") {
    Write-Host "Moving pages..." -ForegroundColor Yellow
    Copy-Item -Path "pages\*" -Destination "frontend/src/pages\" -Recurse -Force
    Write-Host "✓ Pages moved" -ForegroundColor Green
} else {
    Write-Host "⚠ Pages folder not found" -ForegroundColor Yellow
}

# Move public
if (Test-Path "public") {
    Write-Host "Moving public assets..." -ForegroundColor Yellow
    Copy-Item -Path "public\*" -Destination "frontend/public\" -Recurse -Force
    Write-Host "✓ Public assets moved" -ForegroundColor Green
} else {
    Write-Host "⚠ Public folder not found" -ForegroundColor Yellow
}

Write-Host "`n✅ File migration complete!" -ForegroundColor Green
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Install frontend dependencies: cd frontend && npm install" -ForegroundColor White
Write-Host "2. Test the frontend: npm run dev" -ForegroundColor White
Write-Host "3. You can now delete the old components/, pages/, and public/ folders from root" -ForegroundColor White

