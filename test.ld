ENTRY(main)
OUTPUT_ARCH(i386)
OUTPUT_FORMAT(binary)
SECTIONS {
    . = 0x1000;
    __BEGIN__ = .;

    .hdr ALIGN(512) : {
        LONG(0xC0DEBA5E);   /* Magic number */
        LONG(0x55AA55aa);
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