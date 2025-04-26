import React from 'react'
import CustomButton from './CustomButton'

const AIPicker = ({ prompt , setPrompt , generatingImg ,
  handleSubmit }) => {
  return (
    <div className='aipicker-container'>
      <textarea
        className='aipicker-textarea'
        placeholder='Ask AI to create a picture...'
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <div className='flex flex-wrap gap-3'>
        {generatingImg ? (
          <CustomButton
            type='outline'
            title='Asking AI...'
            customStyles='text-xs'
          />
        ) : (
          <CustomButton
            type='filled'
            title='Generate'
            handleClick={handleSubmit}
            customStyles='text-xs'
          />
        )}
      </div>

    </div>
  )
}

export default AIPicker;