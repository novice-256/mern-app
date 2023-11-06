import React, { useState, useEffect, useRef, useContext } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContextProvider'
import { fetch, destroy } from '../api/api'
import { Res } from '../Context/ResponseMsg'

export default function View() {
    // console.log('i am view')
    const { Auth, setAuth, authUser } = useContext(AuthContext)
    const { ShowMessage, resContext, setResContext } = useContext(Res)

    const [currPage, setCurrPage] = useState()
    const [pages, setTotalPages] = useState()
    const [showPages, setShowPages] = useState([])
    const [showData, setShowData] = useState([])
    const [data, setData] = useState([])
    const [selected, setSelected] = useState({ id: '', fileName: '' })
    const [sorted, setSorted] = useState(false)
    const [filterBy, setFilterBy] = useState(false)

    const fileterRef = useRef()
    const { role } = Auth

    async function getData() {
        // Function to fetch data from the server based on the current page and role
        if (!currPage) setCurrPage(1)
        const res = await fetch(role, currPage, setResContext)
        setData(res.data.userData)
        setShowData(res.data.userData)
        setTotalPages(res.data.totalPages)
    }

    useEffect(() => {
        // Call getData when the current page changes
        getData()
    }, [currPage])

    useEffect(() => {
        // Generate an array of page numbers based on the total number of pages
        const pagesArray = []
        for (let i = 1; i <= pages; i++) {
            pagesArray.push(i)
        }
        setShowPages(pagesArray)
    }, [pages])

    //  remove user
    async function removeItem() {
        if (selected.id === '' || selected.id[0] == null) return alert('please select at least one time')

        const confirmDel = await confirm('Are you sure you want to delete selected items')

        if (confirmDel) {
            try {
                const res = await destroy(selected, role, setResContext)
                // Check res for success
                if (res.statusText.toLowerCase() === 'ok') {
                    setResContext({ succ: true, err: false, msg: res.data.msg })
                    setSelected({ id: '', fileName: '' })
                    getData()
                } else {
                    console.error('delete operation failed due to an unknown reason')
                }
            } catch (error) {
                console.error('Error while removing item:', error)
            }
        }
    }

    // Handle search
    function handleSearch(e) {
        const pattern = new RegExp(e.target.value, 'g')
        if (data[0]) {
            setShowData(
                data.filter((item) => {
                    let matchValue = null
                    for (const key in item) {
                        if (key !== '_id' && key !== 'file' && key !== '__v' && key !== 'token') {
                            matchValue += item[key].match(pattern)
                        }
                    }
                    return matchValue
                })
            )
        }
    }

    // Handle selecting a single item
    function handleSelectCheck(id, filename, e) {
        setSelected((prev) => {
            if (e.target.checked) {
                return { ...prev, id: [...prev.id, id], fileName: [...prev.fileName, filename] }
            } else {
                return { ...prev, id: prev.id.filter((item) => item !== id), fileName: prev.fileName.filter((item) => item != filename) }
            }
        })
    }

    // Handle selecting all items
    function handleSelectAll(e) {
        if (e.target.checked) {
            showData.map((item) =>
                setSelected((prev) => {
                    return { ...prev, id: [...prev.id, item._id], fileName: [...prev.fileName, item.file.filename] }
                })
            )
        } else {
            setSelected({ id: '', fileName: '' })
        }
    }

    function sort(e) {
        const key = e.target.innerText.toLowerCase()
        if (!sorted) {
            setShowData(showData.sort((a, b) => a[key].localeCompare(b[key])))
            setSorted((prev) => !prev)
        } else {
            setShowData(showData.sort((a, b) => b[key].localeCompare(a[key])))
            setSorted((prev) => !prev);
        }
    }

    return (
        <div>
            <ShowMessage />
            <div className="col-12 d-flex align-items-center justify-content-end align-items-stretch p-0 m-0 mb-3">
                <i
                    className="fa-solid fa-magnifying-glass bg-gradient px-2 d-flex align-items-center border-left"
                    style={{ borderRadius: '8px 0px 0px 8px', backgroundColor: '#a3aebf' }}
                ></i>
                <input
                    type="text"
                    name="search"
                    placeholder="Search.."
                    className="form-control col-4"
                    style={{ borderRadius: '0px 8px 8px 0px', width: '30%' }}
                    onInput={handleSearch}
                />
            </div>
            <div className="overflow-x-scroll table-container mb-4">
                <table className="table table-light table-bordered table-stripped text-center table-hover shadow text-capitalize" style={{ verticalAlign: "middle" }}>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th className="position-relative">
                                <span onClick={sort}>Name</span>
                                <i
                                    className={`fa-solid fa-sort-up position-absolute ${!sorted && 'text-secondary'}`}
                                    style={{ top: '30%', right: '20%' }}
                                ></i>
                                <i
                                    className={`fa-solid fa-sort-down position-absolute ${sorted && 'text-secondary'}`}
                                    style={{ top: '30%', right: '20%' }}
                                ></i>
                            </th>
                            <th className="position-relative">
                                <span onClick={sort}>Role</span>
                                <i
                                    className={`fa-solid fa-sort-up position-absolute ${!sorted && 'text-secondary'}`}
                                    style={{ top: '30%', right: '20%' }}
                                ></i>
                                <i
                                    className={`fa-solid fa-sort-down position-absolute ${sorted && 'text-secondary'}`}
                                    style={{ top: '30%', right: '20%' }}
                                ></i>
                            </th>
                            <th>Status</th>
                            <th>Action</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {showData.map((item, index) => {
                            // Filter the data by role if needed
                            return (
                                <tr key={index}>
                                    <td>
                                        
                                        <img  style={{textTransform:'lowercase'}} src={`https://emp-app-ca789b749d5f.herokuapp.com/Images/${item.file && item.file.filename}`} className="img" width={80} alt={item.file && item.file.filename} />
                                    </td>
                                    <td>{item.name}</td>
                                    <td>{item.role}</td>
                                    <td>
                                        {item.token ? (
                                            <span className="text-success">Online </span>
                                        ) : (
                                            <span className="text-danger">Offline</span>
                                        )}
                                    </td>
                                    {authUser('admin') && (
                                        <>
                                            <td>
                                                <Link className={'a'} to={`/update/${item.role}/${item.name}/${item._id}/${item.file.filename}`}>
                                                    Update
                                                </Link>
                                            </td>
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    checked={selected.id && selected.id.includes(item._id)}
                                                    onChange={(e) => handleSelectCheck(item._id, item.file.filename, e)}
                                                />
                                            </td>
                                        </>
                                    )}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <ul className="pagination d-flex justify-content-center">
                {showPages.map((no, key) => {
                    const active = currPage === no && 'active';
                    return (
                        <li className="page-item" key={key}>
                            <Link className={`page-link border-0 ${active}`} onClick={() => setCurrPage(no)} to={`/view/${no}`}>
                                {no}
                            </Link>
                        </li>
                    );
                })}
            </ul>
            {authUser('admin') && (
                <div style={{ textAlign: 'right', border: '' }} className="border-none border-top p-2">
                    <span className="mx-3" style={{ fontWeight: 'bolder' }}>
                        Select All
                        <input type="checkbox" className="mx-3" onClick={handleSelectAll} />
                    </span>
                    <span onClick={removeItem} className="mx-3 btn btn-danger" style={{ fontWeight: 'bolder' }}>
                        <i className="fa-solid fa-trash-can mx-2"></i>
                        Delete Selected
                    </span>
                </div>
            )}
        </div>
    );
}
