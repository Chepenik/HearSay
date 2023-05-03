import React, { useState, useEffect } from "react";

const SocialMediaShow = props => {
    const [socialMediaShow, setSocialMediaShow] = useState({
        name: "",
        url: "",
        description: "",
    })

    const getSocialMedia = async () => {
        const socialMediaId = props.match.params.id 
        try {
            const response = await fetch(`/api/v1/websites/${socialMediaId}`)
            if (!response.ok) {
                const errorMessage = `${response.status} (${response.statusText})`
                const error = new Error(errorMessage)
                throw(error)
            }
            const body = await response.json()
            setSocialMediaShow(body.website)
        } catch(err) {
            console.error(`Error in fetch: ${err.message}`)
        }
    } 

    useEffect(() => {
        getSocialMedia()
    }, [])

return (
    <div className="show-page">
      <h2 className="show-title">{socialMediaShow.name}</h2>
      <a href={socialMediaShow.url} target='_blank'>Check Out The Platform</a>
      <p>{socialMediaShow.description}</p>
    </div>
  );
}
export default SocialMediaShow
