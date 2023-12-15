import Feed from '@components/Feed';

const Home = () => {
  return (
        <section className="w-full flex-center flex-col">
            <h1 className="head_text text-center" >

                Flexibble
                <br className="max-md:hidden" />
                <span className="orange_gradient text-center"> AI-powered Prompts </span>
            </h1>
            <p className="desc text-center">
                Flexibble placeholder text
            </p>

            <Feed />
        </section>
  )
}

export default Home