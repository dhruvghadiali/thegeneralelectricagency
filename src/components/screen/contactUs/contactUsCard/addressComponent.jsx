import { MapPin } from "lucide-react";

const AddressComponent = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
      {/* Main Office */}
      <div className="space-y-6 lg:space-y-8">
        <div className="relative">
          <div className="absolute -left-2 top-0 w-1 h-full bg-gradient-to-b from-primary to-primary/50 rounded-full"></div>
          <div className="pl-6">
            <h4 className="text-xl sm:text-2xl font-bold text-primary mb-3 flex items-center gap-3">
              Main Office - Ankleshwar
            </h4>
          </div>
        </div>

        {/* Main Office Address */}
        <div className="group dark:hover:bg-primary/10 rounded-2xl p-4 sm:p-6 transition-all duration-300 border border-transparent">
          <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-5">
            <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <h5 className="font-bold text-gray-900 dark:text-white mb-3 text-lg">
                  Address
                </h5>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base">
                  6, Ganesh Shopping Centre <br />
                  Opp. Dr. Beck & C0. G.I.D.C <br />
                  Ankleshwar, Gujarat - 393002
                  <br />
                  India
                </p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-600 rounded-xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3690.8245678901234!2d73.0039037!3d21.6254025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395f8a0b95555555%3A0x1bee03bf4535c124!2sThe%20General%20Electric%20Agency!5e0!3m2!1sen!2sin!4v1728234567890!5m2!1sen!2sin"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-xl w-full"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Branch Office */}
      <div className="space-y-6 lg:space-y-8">
        <div className="relative">
          <div className="absolute -left-2 top-0 w-1 h-full bg-gradient-to-b from-primary to-primary/50 rounded-full"></div>
          <div className="pl-6">
            <h4 className="text-xl sm:text-2xl font-bold text-primary mb-3 flex items-center gap-3">
              Branch Office - Bharuch
            </h4>
          </div>
        </div>

        {/* Branch Office Address */}
        <div className="group dark:hover:bg-primary/10 rounded-2xl p-4 sm:p-6 transition-all duration-300 border border-transparent">
          <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-5">
            <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <h5 className="font-bold text-gray-900 dark:text-white mb-3 text-lg">
                  Address
                </h5>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base">
                  A 140, First Floor Shilpi Square <br />
                  Sherpura near Dahej By Pass Road, <br />
                  Bharuch, Gujarat - 392015
                  <br />
                  India
                </p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-600 rounded-xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.2156!2d72.9732233!3d21.7185444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be02759744daffd%3A0x4001f68d2035ce24!2sShilpi%20Square!5e0!3m2!1sen!2sin!4v1696598400000!5m2!1sen!2sin"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-xl w-full"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressComponent;
