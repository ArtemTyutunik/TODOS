
export const arrowIconStyles = () => ({
  'position': 'absolute',
  'left': '-25px',
})

export const tagItemContainer = {
  'display': 'flex',
  'position': 'relative',
  'alignItems': 'center',
  'justifyContent': 'space-between',
  'padding': '8px 0',
  'mt': '5px',
  'cursor': 'pointer',
  'borderBottom': '1px solid rgba(0, 0, 0, 0.12)',
  '&:hover': {
    '.tag_actions': {
      opacity: 1,
    },
  },
}

export const tagActionStyles = {
  position: 'absolute',
  backgroundColor: '#fff',
  opacity: 0,
  zIndex: 9,
  top: 0,
  right: 0,
}

export const iconStyles = {
  color: '#a09f9f',
  fontSize: '20px',
}
