// src/components/Book.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { addBook, listBooks } from '../../redux/slice/bookSlice';
import { AppDispatch, RootState } from '../../redux/store';

interface Book {
    author: string;
    title: string;
}

const Books: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const books = useSelector((state: RootState) => state.books.books);
    
    const [showModal, setShowModal] = useState(false);
    const [author, setAuthor] = useState<string>('');
    const [title, setTitle] = useState<string>('');

    const handleAddBook = () => {
        if (author && title) {
            dispatch(addBook({ author, title }));
            setAuthor('');
            setTitle('');
            setShowModal(false);
            dispatch(listBooks());
        } else {
            toast.error('author and title are required!');
        }
    };

    useEffect(() => {
        dispatch(listBooks());
    }, [dispatch]);

    return (
        <div className="container mt-4">
            <h2>Books List</h2>

            <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                Add Book
            </button>

            <div className={`modal fade ${showModal ? 'show' : ''}`} tabIndex={-1} style={{ display: showModal ? 'block' : 'none' }} aria-hidden={!showModal}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add Book</h5>
                            <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Author"
                                    value={author}
                                    onChange={(e) => setAuthor(e.target.value)}
                                />
                                <input
                                    type="text"
                                    className="form-control mt-2"
                                    placeholder="Title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                Close
                            </button>
                            <button type="button" className="btn btn-primary" onClick={handleAddBook}>
                                Add Book
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
            <table className="table table-striped mt-4">
                <thead>
                    <tr>
                        <th>Author</th>
                        <th>Title</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book: Book, index: number) => (
                        <tr key={index}>
                            <td>{book.author}</td>
                            <td>{book.title}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Books;
