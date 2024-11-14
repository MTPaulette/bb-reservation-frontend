import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";

import Title from "@/components/Title"
import { useTranslations } from "next-intl";

const classNames = {
  body: "py-6",
  backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
  base: "top-12 border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
  header: "border-b-[1px] border-divider",
  footer: "border-t-[1px] border-divider",
  closeButton: "hover:bg-white/5 active:bg-white/10",
}

export default function MyModal({
  open, close, children, title
}: {
  open: Boolean, close: any, children: React.ReactNode, title: string
}) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const t = useTranslations("Modal");

  return (
    <>
      {/* <Button onPress={onOpen}>Open Modal</Button> 
        classNames = {{
          base: "top-12"
        }}*/}
      <Modal 
        backdrop="blur"
        size="2xl"
        isOpen={open}
        scrollBehavior="outside"
        onOpenChange={onOpenChange}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          }
        }}
        radius="lg"
        hideCloseButton={true}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <Title className="text-xl sm:text-2xl">{title}</Title>
              </ModalHeader>
              <ModalBody>
                {children}
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={() => {onClose ; close()}}>
                {/* <Button color="default" variant="flat" onPress={() => {onClose ; close()}}> */}
                  {t("close")}
                </Button>
                {/* <Button color="primary" onPress={() => {onClose ; close()}}>
                  Action
                </Button> */}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}