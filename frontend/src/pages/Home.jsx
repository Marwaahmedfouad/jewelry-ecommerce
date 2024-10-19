import Product from "./Product";


function Home() {

  return (
    <>
      <section className="HomeImage text-white vh-100 d-flex flex-column px-5 justify-content-center gap-3">
        <h2>the autumn equinox</h2>
        <h6>Fall has arrived. Shop for our new releases starting today.</h6>
        <div>
          <button
            className="btn btn-outline-light text-white"
            style={{ width: "10%" }}
          >
            Shop Now
          </button>
        </div>
      </section>
      <Product/>
    </>
  );
}

export default Home;

