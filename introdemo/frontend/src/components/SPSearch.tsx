import { SPStore } from '../store/SP_store';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Field,
  Input,
  HStack,
  VStack,
  Heading,
  Text,
} from "@chakra-ui/react";

const SPSearch = () => {
    const { SP, changeSearch } = SPStore();
    const [searchTerm, setSearchTerm] = useState<string>("");

    useEffect(() => {
        changeSearch("No debería haber una tienda con este nombre");
    }, [changeSearch]);

    const handleSearch = () => {
        changeSearch(searchTerm);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    return (
        <Box>
            <HStack mb={4} gap={3} align="flex-end">
                <Field.Root maxW="360px" flex="1">
                    <Field.Label mb={2} fontSize="sm">Buscador por nombre</Field.Label>
                    <Input
                        type="text"
                        borderColor="#555"
                        value={searchTerm}
                        onChange={handleInputChange}
                        placeholder="Buscar SellingPoint por nombre..."
                    />
                </Field.Root>
                <Button
                    colorScheme="teal"
                    onClick={handleSearch}
                    borderColor="#777"
                    fontSize="sm"
                >
                    Buscar
                </Button>
            </HStack>

            <Box mt={6}>
                
                {SP && SP.length > 0 ? (
                    <VStack gap={4} align="stretch">
                        {SP.map((sp) => (
                            <Box
                                key={sp.id}
                                p={4}
                                borderWidth="1px"
                                borderRadius="md"
                                borderColor="gray.600"
                                _hover={{ borderColor: "gray.700", shadow: "sm" }}
                                transition="all 0.2s"
                            >
                                <Link to={`/sellingPoint/${sp.id}`}>
                                    <Heading as="h4" size="sm" color="#ffb5df" mb={2}>
                                        {sp.name}
                                    </Heading>
                                </Link>
                                <Text fontSize="sm" color="gray.400">
                                    Tipo de puesto: {sp.static_point ? "Estático" : "Dinámico"}
                                </Text>
                                <Text fontSize="sm" color="gray.400">
                                    Tipo de producto: {sp.product_type}
                                </Text>
                                {sp.zone && (
                                    <Text fontSize="sm" color="gray.400">
                                        Zona: {sp.zone}
                                    </Text>
                                )}
                            </Box>
                        ))}
                    </VStack>
                ) : (
                    <Box
                        p={6}
                        textAlign="center"
                        borderWidth="1px"
                        borderRadius="md"
                        border="none"
                    >
                        <Text color="gray.500">
                            Ingresa un término de búsqueda para ver resultados
                        </Text>
                    </Box>
                )}
            </Box>
        </Box>
    )
}

export default SPSearch;