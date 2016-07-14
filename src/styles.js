import reactCSS from 'reactcss'

export default reactCSS({
  default: {
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 10
    },
    trigger: {
      position: 'relative',
      zIndex: 11
    }
  }
})
