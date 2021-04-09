FilePond.registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginImageResize,
    FilePondPluginFileEncode,
  )
  
  FilePond.setOptions({
    stylePanelAspectRatio: 130 / 100,
    imageResizeTargetWidth: 100,
    imageResizeTargetHeight: 130
  })
  
  FilePond.parse(document.body);