import Breadcrumb from "@/components/admin/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import { CameraIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Next.js Profile | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Profile page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const Profile = () => {
  return (
    <>
      <div className="mx-auto max-w-242.5">
        <Breadcrumb pageName="Profile" />

        <div className="overflow-hidden rounded-sm border border-divider bg-background shadow-default">
          <div className="relative z-20 h-35 md:h-65">
            <Image
              src={"/images/cover/cover-01.png"}
              alt="profile cover"
              className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
              width={970}
              height={260}
              style={{
                width: "auto",
                height: "auto",
              }}
            />
            <div className="absolute bottom-1 right-1 z-10 xsm:bottom-4 xsm:right-4">
              <label
                htmlFor="cover"
                className="flex cursor-pointer items-center justify-center gap-2 rounded bg-primary px-2 py-1 text-sm font-medium text-white hover:bg-opacity-80 xsm:px-4"
              >
                <input
                  type="file"
                  name="cover"
                  id="cover"
                  className="sr-only"
                />
                <span>
                  <CameraIcon fill="white" size={14} />
                </span>
                <span>Edit</span>
              </label>
            </div>
          </div>
          <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
            <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
              <div className="relative drop-shadow-2">
                <Image
                  src={"/images/user/user-06.png"}
                  width={160}
                  height={160}
                  style={{
                    width: "auto",
                    height: "auto",
                  }}
                  alt="profile"
                />
                <label
                  htmlFor="profile"
                  className="absolute bottom-0 right-0 flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2"
                >
                  <CameraIcon fill="white" size={14} />
                  <input
                    type="file"
                    name="profile"
                    id="profile"
                    className="sr-only"
                  />
                </label>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="mb-1.5 text-2xl font-semibold text-foreground">
                Danish Heilium
              </h3>
              <p className="font-medium">Ui/Ux Designer</p>
              <div className="mx-auto mb-5.5 mt-4.5 grid max-w-94 grid-cols-3 rounded-md border border-divider py-2.5 shadow-1 dark:bg-content2">
                <div className="flex flex-col items-center justify-center gap-1 border-r border-divider px-4 xsm:flex-row">
                  <span className="font-semibold text-foreground">
                    259
                  </span>
                  <span className="text-sm">Posts</span>
                </div>
                <div className="flex flex-col items-center justify-center gap-1 border-r border-divider px-4 xsm:flex-row">
                  <span className="font-semibold text-foreground">
                    129K
                  </span>
                  <span className="text-sm">Followers</span>
                </div>
                <div className="flex flex-col items-center justify-center gap-1 px-4 xsm:flex-row">
                  <span className="font-semibold text-foreground">
                    2K
                  </span>
                  <span className="text-sm">Following</span>
                </div>
              </div>

              <div className="mx-auto max-w-180">
                <h4 className="font-semibold text-foreground">
                  About Me
                </h4>
                <p className="mt-4.5">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Pellentesque posuere fermentum urna, eu condimentum mauris
                  tempus ut. Donec fermentum blandit aliquet. Etiam dictum
                  dapibus ultricies. Sed vel aliquet libero. Nunc a augue
                  fermentum, pharetra ligula sed, aliquam lacus.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
