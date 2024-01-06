import { createPortal } from "react-dom";

import React from 'react'

export default function Portal({ children }: any) {
    return createPortal(children, document.body)
}
