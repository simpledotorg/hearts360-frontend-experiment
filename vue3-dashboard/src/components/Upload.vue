<template>
  <!-- Main Content -->
  <main class="main">
    <div class="header">
      <h1>Upload</h1>
    </div>
    <p>Upload your monthly report to the dashboard. Uploading a file to an existing month will overwrite the month's previous data with the new file.</p>
    <!-- Uploading Message Block -->
    <div class="uploading-message-block">
      <div class="uploading-message-content">
        <div class="uploading-spinner"></div>
        <p>Your file is being uploaded. Please wait...</p>
      </div>
    </div>

    <!-- Choose File Block -->
    <div class="file-upload-block">
      <div class="file-upload-content">
        <div class="file-upload-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="17 8 12 3 7 8"></polyline>
            <line x1="12" y1="3" x2="12" y2="15"></line>
          </svg>
        </div>
        <h3>Choose a file to upload</h3>
        <p class="file-upload-hint">Click to browse or drag and drop your file here</p>
        <input
          type="file"
          id="file-input"
          class="file-input"
          @change="handleFileSelect"
        />
        <label for="file-input" class="file-input-label">
          Browse Files
        </label>
      </div>
    </div>
  </main>
</template>

<script setup>
// Upload page component with uploading message block

const handleFileSelect = (event) => {
  const file = event.target.files[0]
  if (file) {
    console.log('File selected:', file.name)
    // File upload logic will be added here
  }
}
</script>

<style scoped>
.uploading-message-block {
  background: #e3f2fd;
  border: 1px solid #2196f350;
  /* border-left: 4px solid #2196f3; */
  border-radius: 4px;
  padding: 0.5rem 1.25rem;
  min-height: 60px;
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
}

.uploading-message-content {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
}

.uploading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid #90caf9;
  border-top-color: #2196f3;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  flex-shrink: 0;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.uploading-message-content p {
  color: #1565c0;
  font-size: 0.9rem;
  margin: 0;
  font-weight: 500;
}

/* File Upload Block */
.file-upload-block {
  background: #ffffff;
  border: 2px dashed #cbd5e0;
  border-radius: 8px;
  padding: 4rem 2rem;
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  cursor: pointer;
}

.file-upload-block:hover {
  border-color: #2196f3;
  background: #f5f9ff;
}

.file-upload-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  max-width: 500px;
}

.file-upload-icon {
  width: 64px;
  height: 64px;
  color: #90a4ae;
  margin-bottom: 1.5rem;
}

.file-upload-block:hover .file-upload-icon {
  color: #2196f3;
}

.file-upload-content h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 0.5rem 0;
}

.file-upload-hint {
  color: #666;
  font-size: 0.9rem;
  margin: 0 0 2rem 0;
}

.file-input {
  display: none;
}

.file-input-label {
  display: inline-block;
  padding: 0.75rem 2rem;
  background: #2196f3;
  color: #ffffff;
  border-radius: 4px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.file-input-label:hover {
  background: #1976d2;
}
</style>

