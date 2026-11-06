let url = 'ui/index.html'

if (process.env.NODE_ENV === 'development') {
  url = 'http://localhost:5173'
}

nw.Window.open(
  url,
  {
    title: 'title',
    width: 640,
    height: 480,
    position: 'center',
    show: false,
  },
  win => {
    win.on('loaded', () => {
      win.show()
      win.focus()
    })
  },
)
