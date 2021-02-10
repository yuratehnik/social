//returns promises from server response

const successSignal = (res) => {
    if(res.status === 200) {
        return res.json().then((data)=>{
            return new Promise((resolve) => {
                resolve({...data, status : 200})
            })
        })
    } else {
        return res.json()
            .then(data=>{
                return new Promise((resolve)=> {
                    resolve({status: res.status, message: data.message});
                })
            });

    }
}

const errorSignal = (err) => {
    return new Promise((resolve)=> {
        resolve({status: 500, message: err})
    })
}

export {successSignal, errorSignal}