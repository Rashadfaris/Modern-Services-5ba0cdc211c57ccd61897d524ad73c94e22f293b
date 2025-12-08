# Firebase Setup Script for Modern Services
# This script helps automate the Firebase setup process

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Firebase Setup for Modern Services" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Firebase CLI is installed
Write-Host "Checking Firebase CLI..." -ForegroundColor Yellow
$firebaseInstalled = Get-Command firebase -ErrorAction SilentlyContinue

if (-not $firebaseInstalled) {
    Write-Host "Firebase CLI not found. Installing..." -ForegroundColor Yellow
    npm install -g firebase-tools
    Write-Host "Firebase CLI installed!" -ForegroundColor Green
} else {
    Write-Host "Firebase CLI is installed ✓" -ForegroundColor Green
}

Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "1. Run: firebase login" -ForegroundColor White
Write-Host "2. Run: firebase init" -ForegroundColor White
Write-Host "   - Select: Firestore, Functions" -ForegroundColor Gray
Write-Host "   - Choose: Use an existing project" -ForegroundColor Gray
Write-Host "   - Select your Firebase project" -ForegroundColor Gray
Write-Host ""
Write-Host "3. After initialization, run this script again with --deploy flag" -ForegroundColor White
Write-Host "   Example: .\setup-firebase.ps1 --deploy" -ForegroundColor Gray
Write-Host ""

if ($args -contains "--deploy") {
    Write-Host "Deploying Firestore rules and indexes..." -ForegroundColor Yellow
    firebase deploy --only firestore:rules,firestore:indexes
    
    Write-Host ""
    Write-Host "Building functions..." -ForegroundColor Yellow
    Set-Location functions
    npm run build
    Set-Location ..
    
    Write-Host ""
    Write-Host "Deploying Cloud Functions..." -ForegroundColor Yellow
    firebase deploy --only functions
    
    Write-Host ""
    Write-Host "✓ Deployment complete!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Don't forget to:" -ForegroundColor Yellow
    Write-Host "1. Set email config: firebase functions:config:set email.user='your_email@gmail.com' email.password='your_app_password'" -ForegroundColor White
    Write-Host "2. Create .env file with your Firebase config" -ForegroundColor White
    Write-Host "3. Restart your dev server" -ForegroundColor White
}

