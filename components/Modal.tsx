/* eslint-disable @typescript-eslint/no-explicit-any */
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";

import Title from "@/components/Title"
import { useTranslations } from "next-intl";

export default function MyModal({
  open, close, children, title, size="2xl"
}: {
  open: boolean, close: any, children: React.ReactNode, title: string, 
  size: string
}) {
  // const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const {onOpenChange} = useDisclosure();
  const t = useTranslations("Modal");

  return (
    <>
      <Modal 
        backdrop="blur"
        // size="2xl"
        size={size}
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
                {/* <Button color="default" variant="light" onPress={() => {onClose ; close()}}> */}
                <Button color="default" variant="light" onPress={() => {onClose() ; close()}}>
                  {t("close")}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}