import JSZip from 'jszip'

const unzipFile = zipFile => {
  return JSZip.loadAsync(zipFile) // read the Blob
    .then(zip => {
      const convertAsync = []

      zip.forEach(function(relativePath, zipEntry) {
        const convert = zipEntry.async('Blob').then(blob => {
          const file = new File([blob], zipEntry.name)
          return file
        })
        convertAsync.push(convert)
      })

      return Promise.all(convertAsync).then(files => {
        return files
      })
    })
    .catch(error => Promise.reject(error))
}

export default unzipFile
