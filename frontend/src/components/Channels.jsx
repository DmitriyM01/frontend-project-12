import { useSelector } from 'react-redux';

const Channels = ({ clickHandler, currentChannel, openModal }) => {
  const channels = useSelector((state) => {
    return state.channelsReducer
  })

  const { entities, ids } = channels;

    return (
      <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
        <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
          <b>Каналы</b>
          <button onClick={openModal} type="button" className="p-0 text-primary btn btn-group-vertical">
            <svg className='border border-primary' id="i-plus" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none" stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
              <path d="M16 2 L16 30 M2 16 L30 16" />
            </svg>
            <span className="visually-hidden">+</span>
          </button>
        </div>
        <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">

          {ids.map((id) => {
            const channel = entities[id];
            const btnClasses = `w-100 rounded-0 text-start btn${currentChannel.id === id ? ' btn-secondary' : ''}`
            return (
              <li key={channel.id} className="nav-item w-100">

                 {/* <button onClick={() => clickHandler(channel)} type="button" className={btnClasses}>
                   <span className="me-1">#</span>
                   {channel.name}
                 </button> */}

                <div key={channel.id} className="btn-group">
                  <button onClick={() => clickHandler(channel)} className={btnClasses} type="button">
                    # {channel.name}
                  </button>    
                </div>

              </li>
            )
          })}

        </ul>
      </div>
    )
  }

  export default Channels;