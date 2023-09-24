

const Modal = () =>{
    return(
        <article className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Hello!</h3>
                <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                <div className="modal-action">
                    <form>
                        <button className="btn">Close</button>
                    </form>
                </div>
            </div>
        </article>
    )
}

export default Modal;