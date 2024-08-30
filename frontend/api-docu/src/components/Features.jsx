import React from 'react'
import vector from "../assets/vector.svg"
import vector1 from "../assets/vector2.svg"
import vector2 from "../assets/vector3.svg"
const Features = () => {
    const features =[
        {title:"Question Provider",
            body:"We are narrowly focused on making practice questions and answers available to developers building quiz-related applications through our API.",
            icon:vector2,
        },
        {title:"Solution Provider",
            body:"We review and verify questions submitted by users before making the questions available for Public use.",
            icon:vector,
        },
        {title:"Question Bank",
            body:"We have a large database of numerous questions that can be used to access the knowledge of students and learners alike on a particular subject matter. We also accept user submissions to help us grow our question database.",
            icon:vector1,
        }
    ]
  return (
 <section>
    <h1 className='items-center w-[50%] mx-auto md:flex  justify-between font-[500] mb-10 text-[40px] space font-custom'>
        <span className='block w-[150px] rounded h-[3px] bg-primary'>

        </span>
        What do we do
        <span className='block w-[150px] rounded h-[3px] bg-primary'>

        </span>
    </h1>
    <div className='md:grid md:grid-cols-3 w-[90%] space-x-5  mx-auto'>
        {features.map((feature, index)=>(
            <div className='space-y-3 bg-opaquebg px-5 py-10 shadow-lg'>
                <img className='mx-auto' src={feature.icon} alt="" />
                <h3 className='text-[30px]'>{feature.title}</h3>
                <p className='text-[20px]'>{feature.body}</p>
            </div>
        ))}
    </div>
 </section>
  )
}

export default Features