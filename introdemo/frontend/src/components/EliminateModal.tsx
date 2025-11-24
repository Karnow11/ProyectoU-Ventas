import type { sellingPoint } from '../types/sellingPoint';
import sellingPoints from '../services/sellingPointsApi';
import {
  DialogRoot,
  DialogBackdrop,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogTitle,
  DialogCloseTrigger,
} from "@chakra-ui/react";
import { Button, Text, VStack, Heading } from "@chakra-ui/react";
import { SPStore } from "../store/SP_store";

export type SPElimModalProps = {
    isOpened: boolean;
    sellingPoint?: sellingPoint;
    openModal: (id: string) => void;
    onSuccess?: () => void;
};

export const SPElimModal = ({ isOpened, sellingPoint, openModal, onSuccess }: SPElimModalProps) => {
  const { fetchSP } = SPStore();

  const handleDelete = async () => {
    if (!sellingPoint) return;
    try {
      await sellingPoints.deleteSelling(sellingPoint.id);
      await fetchSP();
      openModal("-1");
      // Llamar al callback para recargar la lista del usuario
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error deleting selling point:", error);
    }
  };

  return (
    <DialogRoot open={isOpened} onOpenChange={(e) => !e.open && openModal("-1")}>
      <DialogBackdrop />
      <DialogContent 
        position="fixed" 
        top="100px" 
        left="50%" 
        transform="translateX(-50%)"
      >
        <DialogHeader>
          <DialogTitle color="black">Eliminar SellingPoint</DialogTitle>
          <DialogCloseTrigger />
        </DialogHeader>
        <DialogBody>
          {sellingPoint ? (
            <VStack align="start" gap={3}>
              <Text color="black">¿Deseas eliminar el siguiente SellingPoint?</Text>
              <Heading color="black" size="sm">{sellingPoint.name}</Heading>
              <Text color="gray.500" fontSize="sm">ID: {sellingPoint.id}</Text>
              {sellingPoint.zone && <Text color="gray.600" fontSize="sm">Zona: {sellingPoint.zone}</Text>}
            </VStack>
          ) : (
            <Text>No hay selling point seleccionado.</Text>
          )}
        </DialogBody>
        <DialogFooter>
          <Button colorScheme="red" mr={3} onClick={handleDelete} disabled={!sellingPoint}>
            Borrar
          </Button>
          <Button onClick={() => openModal("-1")}>Cancelar</Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
}