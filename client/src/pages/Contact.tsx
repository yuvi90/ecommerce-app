const Contact = () => {
  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-md md:w-1/2 lg:w-1/3">
        <h2 className="text-3xl font-semibold mb-6">Contact Us</h2>
        <form>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-600"
            >
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Full Name"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Email"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="inquiryType"
              className="block text-sm font-medium text-gray-600"
            >
              Inquiry Type
            </label>
            <select
              id="inquiryType"
              name="inquiryType"
              className="mt-1 p-2 w-full border rounded-md"
            >
              <option value="general">General Inquiry</option>
              <option value="product">Product Inquiry</option>
              <option value="order">Order Inquiry</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-600"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Type your message here..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-full bg-slate-900 text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 mt-8"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
