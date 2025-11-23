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
                    <Field.Label fontSize="sm">Buscar por nombre</Field.Label>
                    <Input
                        type="text"
                        value={searchTerm}
                        onChange={handleInputChange}
                        placeholder="Buscar por nombre..."
                    />
                </Field.Root>
                <Button
                    colorScheme="teal"
                    onClick={handleSearch}
                >
                    Buscar
                </Button>
            </HStack>

            <Box mt={6}>
                <Heading as="h3" size="md" mb={4} color="teal.600">
                    Buscador de SP
                </Heading>
                
                {SP && SP.length > 0 ? (
                    <VStack gap={4} align="stretch">
                        {SP.map((sp) => (
                            <Box
                                key={sp.id}
                                p={4}
                                borderWidth="1px"
                                borderRadius="md"
                                borderColor="gray.200"
                                _hover={{ borderColor: "teal.400", shadow: "sm" }}
                                transition="all 0.2s"
                            >
                                <Link to={`/sellingPoint/${sp.id}`}>
                                    <Heading as="h4" size="sm" color="teal.600" mb={2}>
                                        {sp.name} — #{sp.id}
                                    </Heading>
                                </Link>
                                <Text fontSize="sm" color="gray.600">
                                    Tipo de puesto: {sp.static_point ? "Estático" : "Dinámico"}
                                </Text>
                                <Text fontSize="sm" color="gray.600">
                                    Tipo de producto: {sp.product_type}
                                </Text>
                                {sp.zone && (
                                    <Text fontSize="sm" color="gray.600">
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
                        borderColor="gray.200"
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