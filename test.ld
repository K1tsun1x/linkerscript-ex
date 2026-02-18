ENTRY(_entry_point)
OUTPUT_ARCH(i386)
OUTPUT_FORMAT(binary)
SECTIONS {
    . = 0x1000;
    __PTR_BEGIN__ = .;

    .hdr ALIGN(512) : {
        LONG(0xDEADBEEF);                                              /* magic */
        LONG(__PTR_BEGIN__);                                           /* base address */
        LONG(((__PTR_END__ - __PTR_BEGIN__ + 511) & ~511) / 512);      /* number of sectors */
        LONG(_entry_point);                                            /* entry point */
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

    __PTR_END__ = .;
    /* EOF */
}