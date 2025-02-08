import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { usePatients, useDeletePatientMutation } from "@/features";
import { LoadingOverlay } from "@/components/Loader/Loader";
import { IPatient } from "@/features";
import { usePatientsStore } from "@/store/dashboard"; 
import { useEffect } from "react";
interface PatientListProps {
  onEdit?: (patient: IPatient) => void;
}

export function PatientList({ onEdit }: PatientListProps) {
  const { data: patientsData, isLoading } = usePatients();
  const deleteMutation = useDeletePatientMutation();
  const setTotalPatients = usePatientsStore((state) => state.setTotalPatients);

  useEffect(() => {
    if (patientsData?.data.patients) {
      setTotalPatients(patientsData.data.patients.length);
    }
  }, [patientsData?.data.patients, setTotalPatients]);
  
  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
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
          {patientsData?.data.patients.map((patient: IPatient) => (
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
  );
}