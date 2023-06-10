export const inputSectionStyle = (isError: boolean) => ({
  'display': 'flex',
  'flexDirection': 'column',
  'justifyContent': 'flex-start',
  'padding': '10px 15px',
  'border': '1px solid #f5f5f5',
  'borderLeft': 0,
  'borderRight': 0,
  'marginBottom': '10px',
  '& .create-tag-input .MuiInputBase-root': {
    '& fieldset': {
      'border': `1px solid  ${isError? 'red' : '#ddd'}`,
    },
  },
  '& .create-tag-input': {
    'width': '100%',
    '& .MuiFormHelperText-root': {
      display: isError ? 'block' : 'none',
    },
  },
})

export const arrowIconStyles = () => ({
  'position': 'absolute',
  'left': '-25px',
})

export const tagNameStyle = (color: string) => ( {
  fontSize: '15px',
  color: color,
  fontFamily: '-apple-system',
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

export const selectStyles = {
  'position': 'relative',
  'zIndex': 1,
  'maxHeight': '250px',

  '& fieldset': {
    border: '1px solid #ddd !important',
  },
  '& .MuiSelect-select': {
    padding: '8px 10px',
    display: 'flex',
    alignItems: 'center',
  },
}

export const MenuStyles = {
  '& .MuiPopover-paper': {
    maxHeight: '250px',
    marginTop: '10px',
  },
}
