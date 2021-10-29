import React from 'react'

const PasswordScore = ({ score }) => {

  function getScore() {
    if (score > 0) {
      return 'none'
    }


  }

  return (
    <div className="pass-score" title={`Password is ${score}% valid`}>
      <div
        className="score"
        style={{
          width: `${score}%`,
          backgroundColor: getScore()
        }}
      />
    </div>
  )
}

export default PasswordScore