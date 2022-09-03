import axios from 'axios';
import { useEffect, useState } from 'react';
import ReactWordcloud from "react-wordcloud"; 

 
const angles:[number, number] = [-10, 10]
const fontSizes:[number, number] = [20,80]

const options = {
    enableTooltip: true,
    rotations: 3,
    rotationAngles: angles,
    fontSizes: fontSizes
  };

function KeywordCloud(props: any) {
    const [keywords, setKeywords] = useState([] as any[])
    useEffect(()=>{
        fetchData()
    },[])

    const fetchData = () => { 
        // @ts-ignore
        let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        console.log("UID",props.uid)
        axios
          .post(
            'https://digital-phenotyping.herokuapp.com/dataServer/twitterWordCloud',{
                uid: props.uid
            },
            {
              headers: {
                Authorization: `Bearer ${userInfo!.access}`,
              },
            }   
          )
          .then((response) => {
            console.log('Fetched data..', response.data);
            let resData = response.data.data 
            let resArr = []
            for(const [key , val] of Object.entries<any>(resData)){
                if(val > 3){
                    resArr.push({
                        text: key,
                        value: val
                    })
                }
            }
            console.log(resArr)
            setKeywords(resArr)
          });
      };
    return (
        <ReactWordcloud options={options} words={keywords} />
    )
}

export default KeywordCloud;