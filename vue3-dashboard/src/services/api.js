/**
 * Fake API service for HEARTS360 Dashboard
 * Simulates API calls with delays to mimic real network requests
 */

import { getDashboardData, regions, districts, facilities } from '../data/hierarchicalData.js'

// Simulate network delay
const delay = (ms = 800) => new Promise(resolve => setTimeout(resolve, ms))

/**
 * Fetch dashboard data from fake API
 * @param {string} region - Optional region filter (can be 'national', 'region', 'district', or specific ID)
 * @param {string} level - Optional level ('national', 'region', 'district', 'facility')
 * @param {string} id - Optional ID for specific region/district/facility
 * @returns {Promise<Object>} Dashboard data
 */
export async function fetchDashboardData(region = null, level = 'national', id = null) {
  await delay(800) // Simulate network delay

  // Determine level and ID from region parameter if provided
  let dataLevel = level
  let dataId = id
  
  // If region is provided as a string, try to determine level
  if (region) {
    if (region === 'national' || region === 'National') {
      dataLevel = 'national'
    } else if (region.startsWith('REG-')) {
      dataLevel = 'region'
      dataId = region
    } else if (region.startsWith('DIST-')) {
      dataLevel = 'district'
      dataId = region
    } else if (region.startsWith('FAC-')) {
      dataLevel = 'facility'
      dataId = region
    } else {
      // Try to find by name
      const foundRegion = regions.find(r => r.name === region)
      const foundDistrict = districts.find(d => d.name === region)
      const foundFacility = facilities.find(f => f.name === region)
      
      if (foundRegion) {
        dataLevel = 'region'
        dataId = foundRegion.id
      } else if (foundDistrict) {
        dataLevel = 'district'
        dataId = foundDistrict.id
      } else if (foundFacility) {
        dataLevel = 'facility'
        dataId = foundFacility.id
      }
    }
  }

  // Return hierarchical data that matches the store structure
  return getDashboardData(dataLevel, dataId)
}

/**
 * Fetch chart data from fake API
 * @param {string} chartType - Type of chart data to fetch
 * @returns {Promise<Object>} Chart data
 */
export async function fetchChartData(chartType) {
  await delay(500) // Simulate network delay
  
  // In a real app, this would return chart-specific data
  // For now, we'll return null as charts are handled by charts.js
  return null
}

/**
 * Update dashboard data (simulate PUT/PATCH request)
 * @param {Object} updates - Data to update
 * @returns {Promise<Object>} Updated data
 */
export async function updateDashboardData(updates) {
  await delay(600)
  
  // In a real app, this would send updates to the server
  return {
    success: true,
    message: 'Dashboard data updated successfully',
    data: updates
  }
}

/**
 * Check for application version updates
 * @returns {Promise<Object>} Version information with latest version
 */
export async function checkVersion() {
  await delay(300) // Simulate network delay
  
  // In a real app, this would check an API endpoint or npm registry
  // For now, return current version (no update available)
  // To test update availability, you can change the version here
  return {
    current: '1.0.0',
    latest: '1.0.0', // Change to '1.0.1' or higher to test update notification
    updateAvailable: false
  }
}

