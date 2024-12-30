const Footer = () => {
  return (
    <footer className="bg-black text-white py-6">
      <div className="container mx-auto text-center">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-lg font-bold">Askme</h2>
            <p className="text-sm mt-2">
              Creating amazing experiences since {new Date().getFullYear() - 5}.
            </p>
          </div>

          <div className="flex space-x-4 mb-4 md:mb-0">
            <a href="#" className="hover:text-blue-400" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="hover:text-blue-300" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="hover:text-pink-400" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
          </div>

          <div>
            <p className="text-sm">
              © {new Date().getFullYear()} Your Company. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
