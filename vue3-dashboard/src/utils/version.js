/**
 * Version management utilities
 */

// Current version - update this when releasing new versions
export const CURRENT_VERSION = '1.0.0'

/**
 * Check if a newer version is available
 * @param {string} currentVersion - Current version string (e.g., "1.0.0")
 * @param {string} latestVersion - Latest version string (e.g., "1.0.1")
 * @returns {boolean} True if latestVersion is newer than currentVersion
 */
export function isNewerVersion(currentVersion, latestVersion) {
  if (!currentVersion || !latestVersion) return false
  
  const current = parseVersion(currentVersion)
  const latest = parseVersion(latestVersion)
  
  // Compare major, minor, patch
  if (latest.major > current.major) return true
  if (latest.major < current.major) return false
  
  if (latest.minor > current.minor) return true
  if (latest.minor < current.minor) return false
  
  if (latest.patch > current.patch) return true
  
  return false
}

/**
 * Parse version string into parts
 * @param {string} version - Version string (e.g., "1.0.0")
 * @returns {Object} Object with major, minor, patch numbers
 */
function parseVersion(version) {
  const parts = version.replace(/^v/, '').split('.')
  return {
    major: parseInt(parts[0] || 0, 10),
    minor: parseInt(parts[1] || 0, 10),
    patch: parseInt(parts[2] || 0, 10)
  }
}

/**
 * Check for newer version from API or npm registry
 * @returns {Promise<{available: boolean, version: string | null}>}
 */
export async function checkForUpdates() {
  try {
    // Option 1: Check from a custom API endpoint
    // const response = await fetch('/api/version')
    // const data = await response.json()
    // return { available: isNewerVersion(CURRENT_VERSION, data.latest), version: data.latest }
    
    // Option 2: Check from npm registry (for published packages)
    // const packageName = '@hearts360/dashboard'
    // const response = await fetch(`https://registry.npmjs.org/${packageName}/latest`)
    // const data = await response.json()
    // return { available: isNewerVersion(CURRENT_VERSION, data.version), version: data.version }
    
    // Option 3: Use the API service (recommended for this app)
    const { checkVersion } = await import('../services/api.js')
    const versionInfo = await checkVersion()
    
    if (versionInfo.latest && versionInfo.latest !== CURRENT_VERSION) {
      const available = isNewerVersion(CURRENT_VERSION, versionInfo.latest)
      return { available, version: versionInfo.latest }
    }
    
    return { available: false, version: null }
  } catch (error) {
    console.warn('Failed to check for updates:', error)
    return { available: false, version: null }
  }
}

