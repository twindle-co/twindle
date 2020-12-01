const fetch = require('node-fetch')

const jsonfetchData= (url) => fetch(url)
.then(res => res.json())
.then(jsonData => {
    const datajson = {
        
            repoName : jsonData.name,
            creationDate : jsonData.created_at,
            loginName : jsonData.owner.login,
            ownerImage :jsonData.owner.avatar_url
       
    }

    return datajson

    
 } )


module.exports = {jsonfetchData}
