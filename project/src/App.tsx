import React, { useEffect, useState } from 'react';
import { StudentList } from './components/StudentList';
import { StudentForm } from './components/StudentForm';
import { Student } from './types/student';
import { supabase } from './lib/supabase';
import { Toaster } from 'react-hot-toast';
import { GraduationCap, Plus } from 'lucide-react';

function App() {
  const [students, setStudents] = useState<Student[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | undefined>();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const { data } = await supabase
      .from('students')
      .select('*')
      .order('created_at', { ascending: false });
    setStudents(data || []);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      await supabase.from('students').delete().eq('id', id);
      fetchStudents();
    }
  };

  const handleEdit = (student: Student) => {
    setSelectedStudent(student);
    setIsFormOpen(true);
  };

  const handleAddNew = () => {
    setSelectedStudent(undefined);
    setIsFormOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-right" />
      
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8 text-blue-600 mr-2" />
              <h1 className="text-2xl font-bold text-gray-900">Student Management System</h1>
            </div>
            <button
              onClick={handleAddNew}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Student
            </button>
          </div>

          {isFormOpen ? (
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <StudentForm
                student={selectedStudent}
                onClose={() => setIsFormOpen(false)}
                onSuccess={fetchStudents}
              />
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow">
              <StudentList
                students={students}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;