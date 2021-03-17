import React from 'react'

interface Props {
  formTitle: string
}

const FormTitle: React.FC<Props> = ({ formTitle }) => {
  return (
    <div className="heading--form mb-3">
      <strong>{formTitle}</strong>
    </div>
  )
}

export default FormTitle
