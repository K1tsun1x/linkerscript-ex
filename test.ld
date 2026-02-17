ENTRY(_start)
OUTPUT_ARCH(i386)
OUTPUT_FORMAT(pe-i386)
SECTIONS {
    . = 0x1000;
    __BEGIN__ = .;

    .hdr ALIGN(512) : {
        LONG(0xDEADBEEF);
        QUAD(0xC0DEC0FFEE000000);   /* 64-bit value */
        BYTE(0b10111111);
        BYTE(0o734142);
        BYTE(0x55AA);
    }

    .text ALIGN(512) : {
        *(.text)
    }

    .data ALIGN(512) : {
        *(.data)
    }

    .bss ALIGN(512) : {
        *(.bss)
    }

    .rodata ALIGN(512) : {
        *(.rodata)
    }

    __END__ = .;
}