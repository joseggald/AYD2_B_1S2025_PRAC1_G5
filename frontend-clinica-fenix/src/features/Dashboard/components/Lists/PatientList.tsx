import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, FileText } from "lucide-react";
import { usePatients, useDeletePatientMutation } from "@/features";
import { LoadingOverlay } from "@/components/Loader/Loader";
import { IPatient } from "@/features";
import { usePatientsStore } from "@/store/dashboard"; 
import { useEffect } from "react";
import PatientExpedient from "../Dialog/PatientExpedient";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PatientListProps {
  onEdit?: (patient: IPatient) => void;
}

export function PatientList({ onEdit }: PatientListProps) {
  const { data: patientsData, isLoading } = usePatients();
  const deleteMutation = useDeletePatientMutation();
  const setTotalPatients = usePatientsStore((state) => state.setTotalPatients);
  const [selectedPatient, setSelectedPatient] = useState<IPatient | null>(null);
  const [isExpedientOpen, setIsExpedientOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState("all");


  const filteredPatients = useMemo(() => {
    return patientsData?.data.patients.filter(patient => {
      const matchesSearch = Object.values(patient).some(value =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      const matchesGender = genderFilter === "all" || patient.gender === genderFilter;

      return matchesSearch && matchesGender;
    });
  }, [patientsData?.data.patients, searchTerm, genderFilter]);

  useEffect(() => {
    if (filteredPatients) {
      setTotalPatients(filteredPatients.length);
    }
  }, [filteredPatients, setTotalPatients]);
  
  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <>
    <div className="flex gap-4 mb-4">
        <Input
          placeholder="Buscar pacientes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select value={genderFilter} onValueChange={setGenderFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por género" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="M">Masculino</SelectItem>
            <SelectItem value="F">Femenino</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>CUI</TableHead>
              <TableHead>Teléfono</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Edad</TableHead>
              <TableHead>Género</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPatients?.map((patient: IPatient) => (
              <TableRow key={patient.id_patient}>
                <TableCell>{patient.name} {patient.lastname}</TableCell>
                <TableCell>{patient.cui}</TableCell>
                <TableCell>{patient.phone}</TableCell>
                <TableCell>{patient.email}</TableCell>
                <TableCell>{patient.age}</TableCell>
                <TableCell>{patient.gender}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => {
                        setSelectedPatient(patient);
                        setIsExpedientOpen(true);
                      }}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FileText className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => onEdit?.(patient)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => patient.id_patient && 
                        deleteMutation.mutate(patient.id_patient.toString())}
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

      {selectedPatient && (
        <PatientExpedient
          isOpen={isExpedientOpen}
          onClose={() => {
            setIsExpedientOpen(false);
            setSelectedPatient(null);
          }}
          patientCui={selectedPatient.cui}
          patientName={`${selectedPatient.name} ${selectedPatient.lastname}`}
        />
      )}
    </>
  );
}