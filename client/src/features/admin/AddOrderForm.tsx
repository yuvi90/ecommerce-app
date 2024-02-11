const AddProduct = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>
      <form>
        <button
          type="submit"
          className="py-2 px-4 rounded-full bg-slate-900 text-white text-sm font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 mt-4"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
