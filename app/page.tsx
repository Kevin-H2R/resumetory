import { Pacifico } from "next/font/google";
const pacifico = Pacifico({
  weight: '400'
})
export default function Home() {
  
  return (
    <div className="flex flex-col flex-1 justify-center">
      <div className="flex p-4 sm:px-15 md:px-25 lg:px-35 xl:px-70">
        <div className="flex-col flex-1 text-center">
          <div className={ pacifico.className + " text-7xl sm:text-9xl font-bold leading-normal mb-6"}>Make them read your 
            &nbsp;<span className="bg-green-500 px-2 -rotate-3 leading-none inline-block">resume</span></div>
          <div className="text-gray-500 text-xl font-bold mt-12">Companies don't play it fair anymore, why should you?<br/>
          Make sure your resume passes the ATS and lands on a real recruiter’s desk.</div>
        </div>
      </div>
    </div>
  );
}
