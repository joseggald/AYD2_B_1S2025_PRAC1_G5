import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { useRecipes, useDeleteRecipeMutation, IRecipe } from "@/features";
import { LoadingOverlay } from "@/components/Loader/Loader";
import { Input } from "@/components/ui/input";
interface RecipeListProps {
    onEdit?: (recipe: IRecipe) => void;
}


export function RecipeList({ onEdit }: RecipeListProps) {
    const { data: recipesData, isLoading } = useRecipes();
    const deleteMutation = useDeleteRecipeMutation();

    const [searchTerm, setSearchTerm] = useState("");
    const filteredRecipes = useMemo(() => {
        if (!recipesData?.data.recipes) return [];
        return recipesData.data.recipes.filter((recipe) =>
            recipe.medicine.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [recipesData, searchTerm]);



    if (isLoading) {
        return <LoadingOverlay />;
    }

    return (
        <div>
            <div className="flex gap-4 mb-4">
                <Input
                    placeholder="Buscar medicamentos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                />
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Paciente</TableHead>
                            <TableHead>Medicamento</TableHead>
                            <TableHead>Dosis</TableHead>
                            <TableHead>Frecuencia</TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredRecipes?.map((recipe: IRecipe) => (
                            <TableRow key={recipe.id_recipe}>
                                <TableCell>{recipe.name} {recipe.lastname}</TableCell>
                                <TableCell>{recipe.medicine}</TableCell>
                                <TableCell>{recipe.dose}</TableCell>
                                <TableCell>{recipe.frequency}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() => onEdit?.(recipe)}
                                        >
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="text-red-500 hover:text-red-700"
                                            onClick={() => recipe.id_recipe &&
                                                deleteMutation.mutate(recipe.id_recipe.toString())}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </div>

        </div>
    );
}