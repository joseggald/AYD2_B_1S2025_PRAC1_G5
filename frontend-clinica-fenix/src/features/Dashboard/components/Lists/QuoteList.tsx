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
import { useQuotes, useDeleteQuoteMutation } from "@/features";
import { LoadingOverlay } from "@/components/Loader/Loader";
import { IQuote } from "@/features";
import { Input } from "@/components/ui/input";
interface QuoteListProps {
  onEdit?: (quote: IQuote) => void;
}

export function QuoteList({ onEdit }: QuoteListProps) {
  const { data: quotesData, isLoading } = useQuotes();
  const deleteMutation = useDeleteQuoteMutation();
  
  const [searchTerm, setSearchTerm] = useState("");
  const filteredQuotes = useMemo(() => {
    if (!quotesData?.data.quotes) return [];
    
    return quotesData.data.quotes.filter(quote => {
      return Object.values(quote).some(value =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [quotesData?.data.quotes, searchTerm]);


  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <div>
      <div className="flex gap-4 mb-4">
        <Input
          placeholder="Buscar citas..."
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
              <TableHead>CUI</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Hora</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredQuotes?.map((quote: IQuote) => (
              <TableRow key={quote.id_citas}>
                <TableCell>{quote.name} {quote.lastname}</TableCell>
                <TableCell>{quote.cui}</TableCell>
                <TableCell>{new Date(quote.date).toLocaleDateString()}</TableCell>
                <TableCell>{quote.hour}:00</TableCell>
                <TableCell>{quote.description}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => onEdit?.(quote)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => quote.id_citas && 
                        deleteMutation.mutate(quote.id_citas.toString())}
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