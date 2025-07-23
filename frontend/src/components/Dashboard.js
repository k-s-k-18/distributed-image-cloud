import { useEffect, useRef, useState } from "react";
import uploadIcon from '../static/upload-icon.png';
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import profileIcon from '../static/profile-icon.png';
 

const Dashboard = ()=>{

    const fileInputRef = useRef();

    const [imgData, setImgData] = useState([]);

    const [imgAvail, setImgAvail] = useState(false);

    const [logged, setLogged] = useState(false);

    const onUploadClick = ()=>{
        console.log("Upload Clicked");
        fileInputRef.current.click();
    }

    const fileUpload = (e)=>{

        e.preventDefault();
        let form_data = new FormData();

        form_data.append("file",e.target.files[0]);

        //console.log(file);

        const request = new Request('http://localhost:8080/photo/upload',{
            method:'POST',
            headers:new Headers({
                'Authorization':`Bearer: ${document.cookie.split(': ')[1]}`
            }),
            body:form_data
        });

        fetch(request)
        .then(response=>{return response.json()})
        .then(data=>console.log(data))
        .catch((err)=>{
            console.log(err);
        });
    }

    const logoutUser = (e)=>{
        document.cookie = '';
        setLogged(true);
    }



    useEffect(()=>{
        //console.log(document.cookie.split(': ')[1]);
        const request = new Request('http://localhost:8080/photo/photos',{
            method:'GET',
            headers:new Headers({
                'Authorization': `Bearer: ${document.cookie.split(": ")[1]}`,
            })
        });

        fetch(request)
        .then((response)=>{
            if(!response.ok){
                setLogged(true);
                return ;
            }
            return response.json();
        })
        .then((data)=>{

            let images = [];

            console.log('Server Data',data);

            for(let i=0;i<data.length;i++){
                const image = {
                    photoId: data[i].photoId,
                    contentType: data[i].contentType,
                    imageData: data[i].fileData
                }

                images.push(image);
            }

            setImgData(images);

            console.log('State Data', images);

            setImgAvail(true);
        })
    },[imgData]);

    return (
        <>
            <div className="dashboard">

                <div class="navbar">
                    <button className="profile-btn"> Hello <img src={profileIcon}/></button>
                    <button className="logout-btn" onClick={(e)=>logoutUser(e)}> Logout </button>                
                </div>

                <div className="photos-container">
                    {imgAvail && imgData.map(data=>(
                        <div className="img-tile">
                            <img src={`data:${data.contentType};base64,${data.imageData}`} alt="Image"/>
                        </div>
                    ))}
                </div>

                <input type="file" style={{'display':'none'}} ref={fileInputRef} onChange={(e)=>{fileUpload(e)}}/>
                <button onClick={onUploadClick} className="upload-btn"><img src={uploadIcon} alt="Upload Icon"/> Upload</button>
                {logged && <Redirect to='/login'/>}
            </div>
        </>
    );
}

export default Dashboard;