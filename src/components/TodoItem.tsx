export function TodoItem() {
  return (
    <div>
      <ul>
        <li className="item">
          <input type="checkbox" className="pass"/>
          <input className="input-item" type="text" minLength={2} maxLength={64} />
          <svg
            className="change"
            width="64px"
            height="64px"
            viewBox="0 -1 119 119"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            fill="#000000"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <title></title> <desc></desc> <defs></defs>{" "}
              <g
                fill="none"
                fill-rule="evenodd"
                id="Page-1"
                stroke="none"
                stroke-width="1"
              >
                {" "}
                <g fill-rule="nonzero" id="edit">
                  {" "}
                  <path
                    d="M114.2,108.3 L4.8,108.3 C2.5,108.3 0.7,110.2 0.7,112.4 C0.7,114.6 2.6,116.5 4.8,116.5 L114.3,116.5 C116.6,116.5 118.4,114.6 118.4,112.4 C118.4,110.2 116.5,108.3 114.2,108.3 Z"
                    fill="#4A4A4A"
                    id="Shape"
                  ></path>{" "}
                  <path
                    d="M0.7,72 L0.6,91.5 C0.6,92.6 1,93.7 1.8,94.5 C2.6,95.3 3.6,95.7 4.7,95.7 L24.1,95.6 C25.2,95.6 26.2,95.2 27,94.4 L94,27.4 C95.6,25.8 95.6,23.2 94,21.5 L74.8,2.1 C73.2,0.5 70.6,0.5 68.9,2.1 L55.5,15.6 L1.9,69.1 C1.2,69.9 0.7,70.9 0.7,72 Z M71.9,10.9 L85.4,24.4 L77.8,32 L64.3,18.5 L71.9,10.9 Z M9,73.8 L58.4,24.4 L71.9,37.9 L22.5,87.2 L8.9,87.3 L9,73.8 Z"
                    fill="#17AB13"
                    id="Shape"
                  ></path>{" "}
                </g>{" "}
              </g>{" "}
            </g>
          </svg>

          <svg
            className="delete"
            width="64px"
            height="64px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#e70808"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8.53113 1C5.52364 1 3.19671 3.63591 3.56974 6.62017L5.28873 20.3721C5.47639 21.8734 6.7526 23 8.26557 23H15.7344C17.2474 23 18.5236 21.8734 18.7113 20.3721L20.4303 6.62017C20.8033 3.63591 18.4764 1 15.4689 1H8.53113ZM5.70148 5C6.11066 3.8455 7.21175 3 8.53113 3H15.4689C16.7883 3 17.8893 3.8455 18.2985 5H5.70148ZM5.63279 7L7.27329 20.124C7.33584 20.6245 7.76124 21 8.26557 21H15.7344C16.2388 21 16.6642 20.6245 16.7267 20.124L18.3672 7H5.63279Z"
                fill="#e70808"
              ></path>{" "}
              <path
                d="M15.002 10.998C14.6114 10.6075 13.9783 10.6075 13.5878 10.998L12 12.5858L10.4201 11.0058C10.0296 10.6153 9.3964 10.6153 9.00587 11.0058C8.61535 11.3964 8.61535 12.0295 9.00587 12.4201L10.5858 14L9.00001 15.5858C8.60949 15.9763 8.60949 16.6095 9.00001 17C9.39054 17.3905 10.0237 17.3905 10.4142 17L12 15.4142L13.5878 17.0019C13.9783 17.3925 14.6114 17.3925 15.002 17.0019C15.3925 16.6114 15.3925 15.9782 15.002 15.5877L13.4142 14L15.002 12.4123C15.3925 12.0217 15.3925 11.3886 15.002 10.998Z"
                fill="#e70808"
              ></path>{" "}
            </g>
          </svg>
        </li>
      </ul>
    </div>
  );
}
