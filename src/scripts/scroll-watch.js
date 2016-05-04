import $ from 'jquery'
import { focusLoc, locs, getMap } from './map'

let focused, prevScrollPos = 0, breakLoop = false

$(() => {
  const $container = $('.el-bars.container')
  $container.scroll(() => {
    let locKeys = Object.keys(locs)

    const scrollingDown = $container.scrollTop() > prevScrollPos

    if (scrollingDown) {
      locKeys = locKeys.reverse()
    }

    prevScrollPos = $container.scrollTop()

    locKeys.map((l) => {
      if (breakLoop) {
        return
      }
      if (focused === l) {
        breakLoop = true
        return
      }

      const offset = $(`.card.${l}`, $container).offset().top

      if (scrollingDown ? offset < 300 : offset > 10) {
        breakLoop = true
        focused = l

        if (l === 'ricks') {
          l = 'beggars'
          locs[l].marker.setLabel({
            text: locKeys.length + '',
            fontSize: '16px',
            fontWeight: '600',
            color: 'rgba(255,255,255,0.8)'
          })
        } else if (l === 'beggars') {
          locs[l].marker.setLabel({
            text:  '1',
            fontSize: '16px',
            fontWeight: '600',
            color: 'rgba(255,255,255,0.8)'
          })
        }

        focusLoc(l)
        getMap().panTo(locs[l].marker.getPosition())
      }
    })

    breakLoop = false
  })
})
