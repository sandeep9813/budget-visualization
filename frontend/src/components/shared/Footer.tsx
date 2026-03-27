import React from "react";
import { MapPin, Mail, Phone, Facebook,Twitter } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1E4A8A] text-white mt-auto relative   bg-[url('https://giwmscdn.prixacdn.net/media/albums/topbg_CUCDohGKGe.png')] bg-cover bg-center">
      <div className="container mx-auto px-6 py-12 ">
        <div className="flex items-center space-x-3 justify-start mb-6">
          <img
            src="https://giwmscdnone.gov.np/static/assets/image/Emblem_of_Nepal.png"
            alt="Nepal Emblem"
            className="w-24 h-24"
          />
          <div className="leading-tight">
            <h1 className="text-sm font-medium">Government of Nepal</h1>
            <h2 className="text-lg font-bold">Ministry of Finance</h2>
            <p className="text-sm">Singhadurbar, Kathmandu, Nepal</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Office Hours */}
          <div>
            <h4 className="font-semibold text-xl mb-4">Office hours</h4>
            <div className="space-y-4 text-sm">
              <div>
                <p className="font-semibold">Winter (Kartik 16 to Magh 15)</p>
                <p>
                  Sunday - Thursday{" "}
                  <span className="ml-36">10:00 A.M. - 4:00 P.M.</span>
                </p>
                <p>
                  Friday <span className="ml-56">10:00 A.M. - 3:00 P.M.</span>
                </p>
              </div>
              <hr className="border-white/30 my-4" />
              <div>
                <p className="font-semibold">Summer (Magh 16 to Kartik 15)</p>
                <p>
                  Sunday - Thursday{" "}
                  <span className="ml-36">10:00 A.M. - 5:00 P.M.</span>
                </p>
                <p>
                  Friday <span className="ml-56">10:00 A.M. - 3:00 P.M.</span>
                </p>
              </div>
            </div>
          </div>

          {/* Important Links */}
          <div className="space-y-6">
            <h4 className="font-semibold text-xl mb-4">Important Links</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm ">
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm min-w-max">
                <li>
                  <a
                    href="https://www.fcgo.gov.np/"
                    className="text-white hover:text-yellow-400 whitespace-nowrap "
                  >
                    Financial Comptroller General Office
                  </a>
                </li>
                <li>
                  <a
                    href="https://ird.gov.np/"
                    className="text-white hover:text-yellow-400 whitespace-nowrap "
                  >
                    Inland Revenue Department
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.customs.gov.np/"
                    className="text-white hover:text-yellow-400 whitespace-nowrap"
                  >
                    Department of Customs
                  </a>
                </li>
                
                <li>
                  <a
                    href="https://pdmo.gov.np/"
                    className="text-white hover:text-yellow-400 whitespace-nowrap"
                  >
                    Public Debt Management Office
                  </a>
                </li>
                <li>
                  <a
                    href="https://gunaso.opmcm.gov.np"
                    className="text-white hover:text-yellow-400 whitespace-nowrap"
                  >
                    Hello Sarkar
                  </a>
                </li>
                <li>
                  <a
                    href="https://ciaa.gov.np/"
                    className="text-white hover:text-yellow-400 whitespace-nowrap "
                  >
                    CIAA
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.nrb.org.np/"
                    className="text-white hover:text-yellow-400 whitespace-nowrap "
                  >
                    Nepal Rastra Bank
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.lawcommission.gov.np/"
                    className="text-white hover:text-yellow-400 whitespace-nowrap"
                  >
                    Nepal Law Commission
                  </a>
                </li>
                <li>
                  <a
                    href="http://rajpatra.dop.gov.np/"
                    className="text-white hover:text-yellow-400 whitespace-nowrap"
                  >
                    Nepal Rajpatra
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-xl mb-4 ml-28">Contact</h4>
            <ul className="space-y-3 text-sm ml-28">
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 mt-1 text-white/80" />
                <span>Singhadurbar, Kathmandu, Nepal</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-white/80" />
                <span> <a href="gunasao@mof.gov.np">gunasao@mof.gov.np</a> , <a href="info@mof.gov.np">info@mof.gov.np</a></span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-white/80" />
                <span>+977-1-4200537 , +977-1-4211720</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/20 flex flex-col md:flex-row justify-between items-center text-sm text-white/80">
          <p>
            © 2025 Ministry of Finance, Government of Nepal. All rights
            reserved.
          </p>
          <div className="flex space-x-4 mt-4">
  <a
    href="https://www.facebook.com/yourpage"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center text-white hover:text-blue-500"
  >
    <Facebook className="w-5 h-5 mr-2" /> Facebook
  </a>

  <a
    href="https://twitter.com/yourpage"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center text-white hover:text-blue-400"
  >
    <Twitter className="w-5 h-5 mr-2" /> Twitter
  </a>
</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
