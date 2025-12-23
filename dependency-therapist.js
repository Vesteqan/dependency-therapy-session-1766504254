#!/usr/bin/env node

// Dependency Therapist: Because your packages need counseling more than you do

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('\n🧠 DEPENDENCY THERAPIST SESSION STARTING...\n');
console.log('Let\'s explore your emotional baggage together.\n');

// Check if package.json exists (spoiler: it probably does, but let's pretend)
const packagePath = path.join(process.cwd(), 'package.json');
if (!fs.existsSync(packagePath)) {
    console.log('❌ No package.json found. Are you sure this is a project, or just existential dread?');
    process.exit(1);
}

// Read the package.json (the source of all your problems)
const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
const deps = packageJson.dependencies || {};
const devDeps = packageJson.devDependencies || {};

console.log(`📦 Found ${Object.keys(deps).length} dependencies and ${Object.keys(devDeps).length} dev dependencies.`);
console.log('That\'s a lot of relationships to maintain. No wonder you\'re stressed.\n');

// Check for obvious issues
const issues = [];

// Check for circular dependencies (simplified check)
console.log('🔍 Checking for circular relationships (the codependent kind)...');
if (Object.keys(deps).length > 10) {
    issues.push('You have too many dependencies. This isn\'t Tinder - quality over quantity.');
}

// Check for version mismatches in node_modules
console.log('🔍 Looking for version conflicts (the "he said, she said" of packages)...');
try {
    const npmList = execSync('npm list --depth=0', { stdio: 'pipe' }).toString();
    if (npmList.includes('UNMET DEPENDENCY') || npmList.includes('npm ERR!')) {
        issues.push('Some packages aren\'t talking to each other. Classic communication breakdown.');
    }
} catch (error) {
    issues.push('npm list failed. Even npm is avoiding this conversation.');
}

// Check for outdated packages
console.log('🔍 Checking for outdated packages (emotional baggage from the past)...');
try {
    const outdated = execSync('npm outdated --json', { stdio: 'pipe' }).toString();
    if (outdated.trim() && outdated !== '') {
        const outdatedCount = Object.keys(JSON.parse(outdated)).length;
        issues.push(`${outdatedCount} packages are living in the past. Time for an intervention.`);
    }
} catch (error) {
    // npm outdated exits with 1 if there are outdated packages
    if (error.status === 1) {
        issues.push('Some packages are stuck in their old ways. Change is hard.');
    }
}

// Deliver the diagnosis
console.log('\n💊 THERAPIST\'S DIAGNOSIS:\n');

if (issues.length === 0) {
    console.log('✅ Your dependencies are surprisingly well-adjusted!');
    console.log('(This won\'t last. Enjoy it while you can.)\n');
} else {
    console.log('🚨 ISSUES FOUND:\n');
    issues.forEach((issue, i) => {
        console.log(`${i + 1}. ${issue}`);
    });
    console.log('\n💡 PRESCRIPTION:');
    console.log('1. Take a deep breath');
    console.log('2. Run: npm audit fix');
    console.log('3. Consider deleting node_modules and starting fresh');
    console.log('4. Maybe talk to a real human? Just a thought.\n');
}

console.log('Session complete. That\'ll be $200. (jk, it\'s free - unlike your time debugging)\n');
